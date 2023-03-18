import { collection, getDocs, query, where } from "firebase/firestore";
import firestore from "../../../firestore/firestore";
import { Comment } from "../../trips/comments/comment";
import { getTripById } from "../../trips/firestore";

export const getComments = async (userUid: string): Promise<Comment[]> => {
  const commentDocuments = await getDocs(
    query(collection(firestore, "comment"), where("userUid", "==", userUid)),
  );

  const userComments: Comment[] = commentDocuments.docs.map(
    (commentDocument) => commentDocument.data() as Comment,
  );

  // Don't return comments on deleted trips.
  return Promise.all(
    userComments.filter(
      async (comment) => (await getTripById(comment.tripId)) !== null,
    ),
  );
};
