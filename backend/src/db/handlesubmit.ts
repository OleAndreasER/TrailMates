import { addDoc, collection } from "@firebase/firestore";
import db from "./db";

const handleSubmit = (testdata: any) => {
  const ref = collection(db, "test_data"); // Firebase creates this automatically

  const data = {
    testData: testdata,
  };
  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};
export default handleSubmit;
