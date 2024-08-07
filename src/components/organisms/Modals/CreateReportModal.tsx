import { memo } from "react";
import { ModalTemplate, ReportForm } from "@/src/components/organisms";
import { IComment } from "@/src/services";

interface CreateReportModalProps {
  type: 'Card' | 'Comment',
  comment?: IComment,
}

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  type, comment
}) => {
  return (
    <ModalTemplate 
      title="Report issue"
      subtitle="Describe your problem and our support will contact you ASAP🫡"
    >
      <ReportForm type={type} comment={comment} />
    </ModalTemplate>
  );
};

export default memo(CreateReportModal);
