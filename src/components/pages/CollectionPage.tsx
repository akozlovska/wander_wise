'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Routes } from '@/src/lib/constants';
import { useGetCollection } from '@/src/queries';
import { 
  Heading2, 
  Icons, 
  Loader, 
  Divider, 
  Heading5,
  Heading4
} from '@/src/components/atoms';
import { IconButton } from '@/src/components/molecules';
import { Gallery, PrivacyToggle } from '@/src/components/organisms';
import { 
  StandardPageLayout,
  LoadingStateWrapper 
} from '@/src/components/templates';
import { useCopyUrlToClipboard } from '@/src/hooks';
import { useModal } from '@/src/store';
import { Modal } from '@/src/services';

const CollectionPage = () => {
  const { setOpenModal } = useModal();
  const { push } = useRouter();
  const { id } = useParams();
  const collectionId = +id;

  const { 
    data: collection, 
    isError, 
    isLoading 
  } = useGetCollection(collectionId);

  const [isCopied, copy] = useCopyUrlToClipboard(
    Routes.COLLECTION(collectionId)
  );

  useEffect(() => {
    if (isNaN(collectionId) || isError) {
      push(Routes.NOT_FOUND);
    }
  }, [collectionId, isError, push]);

  return (
    <StandardPageLayout>
      <LoadingStateWrapper
        isLoading={isLoading}
        loadingFallbackComponent={<Loader size="lg" />}
      > 
        <div className="flex w-full items-center justify-between">
          <Heading2 text={collection?.name || 'Collection'} font="semibold" />

          <div className="relative flex h-8 items-center gap-5">
            <div className="flex h-fit gap-4">
              <IconButton 
                text="Rename collection" 
                icon={<Icons.edit />} 
                classes="border border-black rounded-full"
                onClick={() => setOpenModal(Modal.RENAME_COLLECTION)}
              />
              <IconButton 
                text="Delete collection" 
                icon={<Icons.delete />} 
                classes="border border-error text-error rounded-full"
                onClick={() => setOpenModal(Modal.DELETE_COLLECTION)}
              />
            </div>

            <Divider classes="h-full w-px" />

            <IconButton 
              icon={<Icons.share className="h-6 w-6" />} 
              onClick={copy}
              classes="p-0"
            />

            {isCopied && (
              <span 
                className="absolute bottom-[44px] right-0 flex 
                items-center  justify-center rounded-2xl bg-white px-6 py-2"
              >
                <Heading5 
                  text="Copied to clipboard!" 
                  font="medium" 
                  classes="text-gray-80" 
                />
              </span>
            )}
          </div> 
        </div>

        {collection && (
          <>
            <div className="-mt-5">
              <PrivacyToggle type="collection" element={collection} />
            </div>

            {!!collection.cardDtos.length ? (
              <Gallery cards={collection.cardDtos} />
            ) : (
              <Heading4 
                text="You don’t have any cards in this collection yet." 
                font="normal"
                classes="pt-4" 
              />
            )}
          </>
        )}
      </LoadingStateWrapper>
    </StandardPageLayout>
  );
};

export default CollectionPage;