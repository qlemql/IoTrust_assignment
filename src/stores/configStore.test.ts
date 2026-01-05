import { describe, it, expect, beforeEach } from 'vitest';
import { useConfigStore } from './configStore';

describe('configStore', () => {
  beforeEach(() => {
    useConfigStore.setState({
      language: 'ko',
      platform: 'android',
      environment: 'dev',
    });
  });

  it('초기 상태가 올바르게 설정되어야 한다', () => {
    const state = useConfigStore.getState();

    expect(state.language).toBe('ko');
    expect(state.platform).toBe('android');
    expect(state.environment).toBe('dev');
  });

  it('setLanguage로 언어를 변경할 수 있어야 한다', () => {
    const { setLanguage } = useConfigStore.getState();

    setLanguage('en');

    expect(useConfigStore.getState().language).toBe('en');
  });

  it('setPlatform으로 플랫폼을 변경할 수 있어야 한다', () => {
    const { setPlatform } = useConfigStore.getState();

    setPlatform('ios');

    expect(useConfigStore.getState().platform).toBe('ios');
  });

  it('setEnvironment로 환경을 변경할 수 있어야 한다', () => {
    const { setEnvironment } = useConfigStore.getState();

    setEnvironment('prod');

    expect(useConfigStore.getState().environment).toBe('prod');
  });

  it('여러 설정을 순차적으로 변경할 수 있어야 한다', () => {
    const state = useConfigStore.getState();

    state.setLanguage('en');
    state.setPlatform('ios');
    state.setEnvironment('stage');

    const updatedState = useConfigStore.getState();
    expect(updatedState.language).toBe('en');
    expect(updatedState.platform).toBe('ios');
    expect(updatedState.environment).toBe('stage');
  });
});
