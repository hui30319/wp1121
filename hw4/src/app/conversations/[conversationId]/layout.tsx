// import AddDialog from "../_components/AddDialog";
// import { useParams } from "next/navigation";
type Props = {
  children: React.ReactNode;

};

function DocEditorLayout({ children }: Props) {
  // const { conversationId } = useParams();
  // const docId = Array.isArray(conversationId) ? conversationId[0] : conversationId;
  return (
    <div className="w-full">
      <div className="fixed right-2 top-1 z-50">
        {/* <AddDialog docId={docId} /> */}
      </div>
      {children}
    </div>
  );
}

export default DocEditorLayout;
