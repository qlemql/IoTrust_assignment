# IoTrust Discovery - 프론트엔드 과제

디센트(D'CENT) 모바일 앱의 Discovery 메인 화면을 구현한 프로젝트입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS |
| **상태 관리 (전역)** | Zustand |
| **서버 상태** | @tanstack/react-query |
| **가상 스크롤** | @tanstack/react-virtual |
| **테스트** | Vitest + React Testing Library |

## 프로젝트 실행 방법

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 환경별 빌드

```bash
# 개발 환경
npm run build:dev

# 스테이징 환경
npm run build:stage

# 프로덕션 환경
npm run build:prod
```

### 테스트 실행

```bash
# 테스트 실행
npm run test:run

# 테스트 감시 모드
npm run test
```

## 환경 설정

`.env` 파일로 환경별 설정 분리:

| 환경 | 파일 | API Base URL |
|------|------|--------------|
| dev | `.env.development` | `http://localhost:3000/api` |
| stage | `.env.staging` | `https://stage-api.dcent.com` |
| prod | `.env.production` | `https://api.dcent.com` |

- **dev 환경**: Mock 데이터 사용
- **stage/prod 환경**: 실제 API 호출 구조 (현재는 Mock으로 대체)

## 구현한 주요 요소

### 1. 상단 배너 캐러셀
- 터치 스와이프로 슬라이드 전환
- 페이지 인디케이터 (1/2, 2/2)
- CTA 버튼 클릭 시 URL 이동
- 스켈레톤 로딩 UI

### 2. 즐겨찾기 리스트
- 수평 스크롤 리스트
- 삭제 버튼 클릭 시 확인 모달 표시
- 삭제 후 UI 즉시 반영 (Zustand)
- 즐겨찾기 클릭 시 URL 이동

### 3. 서비스 리스트
- **가상 스크롤링**: @tanstack/react-virtual로 1000+ 아이템 성능 최적화
- **무한 스크롤**: useInfiniteQuery + IntersectionObserver로 20개씩 자동 로드
- **검색 기능**: 서비스 이름 + 설명으로 실시간 필터링
- **필터링**: 언어/플랫폼/빌드환경 조건 조합으로 노출 여부 결정
- 스켈레톤 로딩 UI

### 4. 서비스 상세 바텀시트
- 서비스 아이콘, 이름, 설명, 네트워크 정보 표시
- 드래그 제스처로 닫기 (터치/마우스 지원)
- Go 버튼 클릭 시 URL 이동

### 5. 이미지 최적화
- Intersection Observer로 지연 로딩 (Lazy Loading)
- WebP 포맷 우선 시도, 실패 시 PNG/JPG fallback
- 에러 시 fallback 이미지 표시
- **앱 레벨 이미지 캐시** (LRU, 최대 200개)
  - 로드된 이미지 URL 추적
  - 재방문 시 스켈레톤 UI 스킵 → 즉시 렌더링
- 페이지 로드 시 아이콘 프리로딩 (requestIdleCallback)

#### 이미지 캐싱 전략
```
┌─────────────────────────────────────────────────────────┐
│  앱 레벨 캐시 (imageCache)                               │
│  - 역할: "이 URL을 본 적 있다" 기록                       │
│  - 효과: 스켈레톤 깜빡임 방지, 즉시 렌더링                 │
│  - 한계: 네트워크 요청 자체는 막지 못함                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  브라우저 HTTP 캐시                                      │
│  - 역할: 실제 이미지 데이터 캐싱                          │
│  - 제어: 서버의 Cache-Control 헤더에 의존                 │
│  - 프로덕션에서는 CDN 설정으로 최적화                      │
└─────────────────────────────────────────────────────────┘
```

> **Note**: 프로덕션 환경에서는 CDN(Cloudflare, CloudFront 등)에서 적절한 캐시 헤더를 설정하여 브라우저 캐싱을 최적화합니다. 현재 GitHub raw 서버는 제어 불가하므로 앱 레벨 캐시로 UX를 개선합니다.

### 6. 전역/지역 상태 분리
| 상태 | 분류 | 관리 방법 |
|------|------|----------|
| 언어/플랫폼/환경 설정 | 전역 | Zustand (configStore) |
| 즐겨찾기 목록 | 전역 | Zustand (favoritesStore) |
| 서비스 목록 (캐싱) | 서버 | React Query |
| 검색어 | 지역 | useState |
| 선택된 서비스 | 지역 | useState |

### 7. API 환경 분리
```typescript
// dev: Mock 데이터 반환
// stage/prod: 실제 API 호출
const fetchData = async <T>(endpoint: string, mockData: T): Promise<T> => {
  if (useMock) {
    return Promise.resolve(mockData);
  }
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  return response.json();
};
```

### 8. 예외처리 및 접근성
- **Error Boundary**: 컴포넌트 에러 시 전체 앱 크래시 방지, 섹션별 독립 적용
- **API 에러 처리**: 배너/서비스 로딩 실패 시 에러 UI 표시
- **빈 데이터 처리**: 즐겨찾기/서비스 목록이 비어있을 때 안내 메시지
- **접근성 개선**:
  - `aria-label` 추가 (버튼, 인터랙티브 요소)
  - 키보드 네비게이션 지원 (Enter/Space로 클릭)
  - 검색어 클리어 버튼

## 데이터 구조 설계

### Service 타입
```typescript
interface Service {
  id: string;
  name: LocalizedText;           // { ko: string, en: string }
  description: LocalizedText;
  iconUrl: string;
  url: string;
  networks: string[];
  supportedLanguages: Language[];     // 지원 언어
  supportedPlatforms: Platform[];     // 지원 플랫폼
  supportedEnvironments: Environment[]; // 지원 환경
}
```

### 확장 가능 구조 고려
- `LocalizedText` 패턴으로 다국어 지원
- 필터링 조건(언어/플랫폼/환경) 배열로 유연한 조합 지원
- 페이지네이션 API 구조 (`PaginatedResponse`)

## 미구현 기능 및 보완 사항

### 비구현 항목 (과제 범위 외)
- 최상단 헤더 (QR 스캔, URL 검색창, 언어 변경)
- 하단 탭바 네비게이션 (My Wallet, Insight, Discovery, Settings)

### 보완하고 싶은 점
1. **테스트 커버리지**: E2E 테스트 추가 (Playwright)
2. **localStorage 연동**: 설정 및 즐겨찾기 영속화
3. **네트워크 상태 감지**: 오프라인 시 안내 메시지
4. **리스트 애니메이션**: 아이템 추가/삭제 시 트랜지션 효과

## 프로젝트 구조

```
src/
├── components/
│   ├── banner/           # 배너 캐러셀
│   ├── favorites/        # 즐겨찾기 리스트
│   ├── services/         # 서비스 리스트/상세
│   └── common/           # 공통 컴포넌트
├── stores/               # Zustand 스토어
├── services/             # API 레이어
├── hooks/                # React Query 훅
├── utils/                # 유틸리티 함수
├── mocks/                # Mock 데이터
├── types/                # TypeScript 타입
├── constants/            # 상수
└── App.tsx
```

## AI 도구 사용 내역

### 사용 도구
- **Claude Code** (Anthropic)

### 사용 방법
Claude Code를 활용하여 다음 작업을 수행했습니다:

1. **프로젝트 구조 설계**: 컴포넌트 계층, 상태 관리 전략, 데이터 타입 설계
2. **코드 구현**: 각 Phase별 컴포넌트 및 로직 구현
3. **테스트 작성**: Vitest + React Testing Library 기반 단위 테스트
4. **코드 리뷰**: 누락된 요구사항 확인, 리팩토링 제안

### 주요 프롬프트 예시

**프로젝트 설계 단계:**
```
IoTrust_실기_가이드 PDF를 분석하고 프로젝트 구현 계획을 세워줘.
기술 스택, 프로젝트 구조, 데이터 타입, 구현 순서를 정리해줘.
```

**컴포넌트 구현 단계:**
```
Phase 7 진행해. 서비스 리스트 구현.
진행하면서 이전 Phase에서 실수한 내용들을 확인해서 똑같은 실수하지말고
작업이 끝나면 커밋하지말고 대기해.
```

**요구사항 검증 단계:**
```
실기_가이드 PDF를 정독하고 잘못 구현되었거나 요구사항을 지키지 못한 내용이 있는지
그리고 여기서 더 추가할 내용이 있는지를 확인해줘.
```

### AI 활용 원칙
- AI가 생성한 코드는 직접 검토 후 필요시 수정
- 요구사항 충족 여부는 PDF 명세와 대조하여 확인
- 커밋 전 빌드/테스트 통과 확인

## 테스트 현황

- **총 67개 테스트 통과**
- filterServices (18 tests)
- configStore (5 tests)
- favoritesStore (8 tests)
- BottomSheet (7 tests)
- BannerCarousel (10 tests)
- FavoritesList (8 tests)
- ServiceList (4 tests)
- ServiceDetailSheet (7 tests)
