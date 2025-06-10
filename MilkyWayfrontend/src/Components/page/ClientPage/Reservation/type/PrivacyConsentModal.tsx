import { privacyPolicy } from "./ReservationJoin";

type Props = {
  consents: { [key: string]: boolean };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string,
    index: number
  ) => void;
  onAllConsent: () => void;
  isAllChecked: boolean;
  isAgreed: boolean;
  onClose: () => void;
  onSubmit: () => void;
  checkboxesRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
};

const PrivacyConsentModal = ({
  consents,
  onChange,
  onAllConsent,
  isAllChecked,
  isAgreed,
  onClose,
  onSubmit,
  checkboxesRefs,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white p-6 rounded-lg w-full sm:w-[700px] max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">개인정보 처리방침</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={onAllConsent}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            {isAllChecked ? "전체 동의 해제" : "전체 동의"}
          </button>
        </div>

        <div className="space-y-6">
          {privacyPolicy.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <div className="mt-2 max-h-48 overflow-y-auto pr-2 border rounded p-2 bg-gray-50">
                {section.content.map((paragraph, i) => (
                  <p key={i} className="text-gray-700 mb-2 text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    ref={(el) => {
                      checkboxesRefs.current[index] = el;
                    }}
                    type="checkbox"
                    checked={consents[section.title] || false}
                    onChange={(e) => onChange(e, section.title, index)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 text-sm">
                    이 항목에 동의합니다.
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            닫기
          </button>
          <button
            disabled={!isAgreed}
            onClick={onSubmit}
            className={`px-6 py-2 text-white rounded-md ${
              isAgreed
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            동의하고 제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyConsentModal;
