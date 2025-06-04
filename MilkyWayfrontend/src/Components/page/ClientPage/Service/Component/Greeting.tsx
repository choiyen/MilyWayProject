interface GreetingProps {
  GreetingText: string;
}

export const Greeting = ({ GreetingText }: GreetingProps) => {
  const sentences = GreetingText.split(". ").filter(Boolean);

  return (
    <div>
      {sentences.map((sentence, idx) => (
        <div className="bg-gray-100">
          <p key={idx} className=" text-gray-950 leading-relaxed text p-2">
            {sentence.trim()}
            {idx < sentences.length - 1 ? "." : ""}
          </p>
        </div>
      ))}
    </div>
  );
};
