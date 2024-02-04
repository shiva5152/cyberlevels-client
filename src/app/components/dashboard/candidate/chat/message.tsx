import { time } from "console";
import "./message.css";
import { format } from "timeago.js";

const StyledResponse = ({ text }: { text: string }) => {
  const textArr = text.split("\n");

  return (
    <div>
      {textArr.map((val) => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
};

export default function Message({
  message,
  own,
  time,
}: {
  message: string;
  own: boolean;
  time: Date;
}) {
  return (
    <div className={own ? "message own" : "message"}>
      {own ? (
        <div className="d-flex justify-content-start">
          <div className=" d-flex flex-column align-items-end   ">
            <p className="messageText">{message}</p>
            <div className="messageBottom">{format(time)}</div>
          </div>
          <div className="messageTop">
            <img
              className="messageImg "
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-start">
          <div className="messageTop">
            <img
              className="messageImg "
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </div>
          <div className=" d-flex flex-column align-items-start   ">
            <p className="messageText">
              <StyledResponse text={message} />
            </p>
            <div className="messageBottom"> {format(time)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
