"use client";

import { 
  ErrorText, 
  Icons, 
  Heading5, 
  TextBase, 
  TextMedium 
} from "@/src/components/atoms";
import { useNormalizedError } from "@/src/hooks";
import { 
  useHideCard, 
  useHideCollection, 
  useRevealCard, 
  useRevealCollection 
} from "@/src/queries";
import { ICard, ICollection } from "@/src/services";

type ChangeCardPrivacyForm = {
  type: 'card',
  element: ICard,
};

type ChangeCollectionPrivacyForm = {
  type: 'collection',
  element: ICollection,
};

type ChangePrivacyFormProps = ChangeCardPrivacyForm 
| ChangeCollectionPrivacyForm;

const ChangePrivacyForm: React.FC<ChangePrivacyFormProps> 
= ({ type, element }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { mutate: hideCard } = useHideCard();
  const { mutate: revealCard } = useRevealCard();
  const { mutate: hideCollection } = useHideCollection();
  const { mutate: revealCollection } = useRevealCollection();

  const isPublic = type === 'card' ? element.shown : element.public;
  const mainText = isPublic ? 'Public' : 'Private';
  const tooltipText = isPublic 
    ? `A public ${type} is available for all users and global search.` 
    : `A private ${type} is visible only to you and will not appear in global search.`;

  const mutationOptions = {
    onError: (err: any) => setErrorMessage(err),
  };

  const handlePrivacyChange = () => {
    if (type === 'card') {
      element.shown 
        ? hideCard(element.id, mutationOptions)
        : revealCard(element.id, mutationOptions);
    } else {
      element.public
        ? hideCollection(element.id, mutationOptions)
        : revealCollection(element.id, mutationOptions);
    }
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          onClick={handlePrivacyChange}
          className='flex items-center gap-2'
        >
          <div className="flex h-6 w-6 cursor-pointer items-center 
          justify-center rounded border border-gray-80">
            {isPublic && (
              <Icons.checked className="h-3 w-3 text-gray-80" />
            )}
          </div>

          {type === 'card' ? (
            <TextMedium text={mainText} font="normal" />
          ) : (
            <Heading5 text={mainText} font="normal" />
          )}
        </div>

        <div className="group flex items-center gap-1 text-gray-70">
          <Icons.question className="h-6 w-6 cursor-pointer text-inherit" />
          {type === 'card' ? (
            <TextMedium 
              text={tooltipText} 
              font="normal" 
              classes="hidden group-hover:block text-inherit"
            />
          ) : (
            <TextBase 
              text={tooltipText} 
              font="normal"
              classes="hidden group-hover:block text-inherit" 
            />
          )}
        </div>
      </div>

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangePrivacyForm;