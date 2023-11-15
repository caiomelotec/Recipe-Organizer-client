import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  FacebookMessengerIcon,
  //
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";
import { AiOutlineClose } from "react-icons/ai";

export const ShareLinksModal = ({ recipeId, setShareModal }) => {
  let shareUrl = `https://koch-by-caio-melo.netlify.app/recipes/${recipeId}`;

  return (
    <div className="share-modal-container">
      <div className="share-icons">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={35} />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={shareUrl}>
          <FacebookMessengerIcon size={35} />
        </FacebookMessengerShareButton>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={35} />
        </EmailShareButton>
        <RedditShareButton url={shareUrl}>
          <RedditIcon size={35} />
        </RedditShareButton>
        <TelegramShareButton url={shareUrl}>
          <TelegramIcon size={35} />
        </TelegramShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={35} />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={35} />
        </LinkedinShareButton>
      </div>
      <button onClick={() => setShareModal(false)}>
        <AiOutlineClose size={20} />
      </button>
    </div>
  );
};
