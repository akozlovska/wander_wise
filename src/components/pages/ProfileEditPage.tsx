'use client';

import { useUser, useModal } from "@/src/store";
import { Divider, Heading2, Heading5, TextBase } from "@/src/components/atoms";
import { PrimaryButton, RoundedButton } from "@/src/components/molecules";
import { 
  ProfileEditForm,
  SocialLinkForm,
} from "@/src/components/organisms";
import { StandardPageLayout } from "@/src/components/templates";
import { Modal } from "@/src/services";

const ProfileEditPage = () => {
  const { user } = useUser();
  const { setOpenModal } = useModal();

  return (
    <StandardPageLayout>
      <article 
        className="flex w-[670px] flex-col items-center gap-6 
        self-center rounded-4xl bg-white px-10 py-12"
      >
        <Heading2 
          text="Personal information" 
          font="semibold" 
          classes="self-start" 
        />

        <ProfileEditForm />

        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Heading5 text="Email" font="medium" />
              <TextBase 
                text={user?.email || ''} 
                font="normal" 
                classes="text-gray-50" 
              />
            </div>
            <div className="w-32">
              <PrimaryButton 
                text="Change" 
                onClick={() => setOpenModal(Modal.CHANGE_EMAIL)}
                classes="h-10" 
              />
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Heading5 text="Password" font="medium" />
              <TextBase 
                text="********" 
                font="normal" 
                classes="text-gray-50" 
              />
            </div>
            <div className="w-32">
              <PrimaryButton 
                text="Change" 
                onClick={() => setOpenModal(Modal.CHANGE_PASSWORD)} 
                classes="h-10"
              />
            </div>
          </div>
        </div>
      </article>

      <article 
        className="flex w-[670px] flex-col items-center gap-6 
        self-center rounded-4xl bg-white px-10 py-12"
      >
        <Heading2 
          text="Social networks" 
          font="semibold" 
          classes="self-start" 
        />

        <SocialLinkForm name="Website" />
        <SocialLinkForm name="Instagram" />
        <SocialLinkForm name="Twitter" />

      </article>

      <div className="w-[670px] self-center">
        <RoundedButton 
          text="Delete profile" 
          style="red"
          onClick={() => setOpenModal(Modal.DELETE_PROFILE)}
        />
      </div>
    </StandardPageLayout>
  );
};

export default ProfileEditPage;