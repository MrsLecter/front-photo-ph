export interface IModalProps {
  children: React.ReactNode;
}

export interface IWrapperModalProps {
  children: React.ReactNode;
  backClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export interface IBackScreenProps {
  backClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
}
