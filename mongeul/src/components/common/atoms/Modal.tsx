interface Props {
  message: string;
  onAccept: () => void;
  onReject: () => void;
}

export default function NotificationModal({
  message,
  onAccept,
  onReject,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
        <p>{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            예
          </button>
          <button
            onClick={onReject}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
