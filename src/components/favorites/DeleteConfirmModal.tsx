import { Modal } from '../common';
import { useConfigStore } from '../../stores/configStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  favoriteName: string;
}

const TEXTS = {
  title: {
    ko: '즐겨찾기 삭제',
    en: 'Delete favorite',
  },
  message: {
    ko: '이 사이트를 즐겨찾기에서 삭제하시겠습니까?',
    en: 'Do you really want to delete this site from your favorites?',
  },
  cancel: {
    ko: '취소',
    en: 'Cancel',
  },
  confirm: {
    ko: '확인',
    en: 'OK',
  },
};

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  favoriteName,
}: Props) => {
  const language = useConfigStore((state) => state.language);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
          {TEXTS.title[language]}
        </h2>
        <p className="text-sm text-gray-600 text-center mb-1">
          &quot;{favoriteName}&quot;
        </p>
        <p className="text-sm text-gray-500 text-center mb-6">
          {TEXTS.message[language]}
        </p>
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors min-h-[44px]"
            onClick={onClose}
          >
            {TEXTS.cancel[language]}
          </button>
          <button
            className="flex-1 py-3 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors min-h-[44px]"
            onClick={handleConfirm}
          >
            {TEXTS.confirm[language]}
          </button>
        </div>
      </div>
    </Modal>
  );
};
