import { collection, getDocs, query, where } from "firebase/firestore";
import firestore from "../../../firestore/firestore";
import { Comment } from "../../trips/comments/comment";

export const getComments = async (userUid: string): Promise<Comment[]> => {
  const commentDocuments = await getDocs(
    query(collection(firestore, "comment"), where("userUid", "==", userUid)),
  );

  return commentDocuments.docs.map(
    (commentDocument) => commentDocument.data() as Comment,
  );
};
