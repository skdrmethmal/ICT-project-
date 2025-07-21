import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ConfirmationModel = ({ isOpen, onClose, onConfirm }) => {
  const onConfirmClick = () => {
    onConfirm();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <div className="flex items-center justify-end mt-4">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirmClick}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
