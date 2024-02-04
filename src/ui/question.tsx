import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const Question = ({
  question,
  options,
}: {
  question: string[];
  options: string[];
}) => {
  const [selected, setSelected] = useState("");
  // console.log(selected);
  return (
    <>
      {question.length > 1 && (
        <div className="_questionContainer">
          <p className="mb-1">{question[0]}</p>
          <div className="_row">
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="" style={{ marginTop: "0.5rem" }}>
                {options.map((option: string) => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    className={({ active, checked }) =>
                      `${active ? "_active" : ""}
                  ${checked ? "_checked" : "bg_white"}
                  _shadow _common mb-3`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="_insideDiv1">
                          <div className="_insideDiv2">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="div"
                                // className={`font-medium  ${
                                //   checked ? "text-white" : "text-gray-900"
                                // }`}
                              >
                                {option}
                              </RadioGroup.Label>
                              {/* <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>
                              {plan.ram}/{plan.cpus}
                            </span>{" "}
                            <span aria-hidden="true">&middot;</span>{" "}
                            <span>{plan.disk}</span>
                          </RadioGroup.Description> */}
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="circle" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          {/* <div>{question[question.length - 1]}</div> */}
        </div>
      )}
    </>
  );
};

export default function Example({ text }: { text: string }) {
  // const text =
  //   "1. Which of the following is an example of a security tool used for monitoring network traffic? \na) Firewall\nb) Antivirus\nc) VPN\nd) None of the above\nAnswer: a) Firewall\n\n2. What is the purpose of a Security Information and Event Management (SIEM) tool? \na) To detect and respond to security threats in real-time\nb) To encrypt sensitive data\nc) To block all incoming network traffic\nd) None of the above\nAnswer: a) To detect and respond to security threats in real-time\n\n3. What is the term used to describe the practice of disguising malicious code or software as legitimate code or software? \na) Hacking\nb) Phishing\nc) Spoofing\nd) Malware obfuscation\nAnswer: d) Malware obfuscation\n\n4. Which of the following is an example of a cyber attack that could be prevented through the use of security tools? \na) Physical theft of company property\nb) Ransomware attack\nc) Employee negligence\nd) None of the above\nAnswer: b) Ransomware attack";
  // const text =
  //   "1) What is JavaScript?\na) A programming language \nb) A markup language\nc) A styling language\nd) None of the above.\nAnswer: a) A programming language \n\n2) What is React?\na) A programming language\nb) A JavaScript library\nc) A database\nd) None of the above\nAnswer: b) A JavaScript library\n\n3) What does frontend development refer to?\na) Development of server-side code \nb) Development of user interface (UI) \nc) Development of network protocols\nd) None of the above \nAnswer: b) Development of user interface (UI) \n\n4) What are the basic data types in JavaScript?\na) Strings, numbers, booleans, null, undefined \nb) Arrays, objects, functions, dates \nc) HTML, CSS, JavaScript \nd) None of the above \nAnswer: a) Strings, numbers, booleans, null, undefined";

  const questions = text.split("\n\n");
  // questions.map((obj, index) => {
  //   const question = obj.split("\n");
  //   // console.log(question);
  // });
  // // console.log(questions);

  return (
    <div>
      {questions?.map((obj, index) => {
        const question = obj.split("\n");
        const options = question.filter((element, index) => index !== 0);

        return <Question question={question} options={options} />;
      })}
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
