import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";

export const addTaskToFirestore = async (task) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user logged in");
        }

        const taskWithUserId = { ...task, userId: user.uid };
        const docRef = await addDoc(collection(db, "todos"), taskWithUserId);
        return { id: docRef.id, ...taskWithUserId };
    } catch (error) {
        console.error("Error adding task: ", error);
        throw error;
    }
};

export const getAllTasks = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user logged in");
        }

        const q = query(collection(db, "todos"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const updateTaskInFirestore = async (taskId, updatedTask) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user logged in");
        }

        const taskRef = doc(db, "todos", taskId);

         // Before updating, verify that the current user owns the task
         const taskDoc = await getDoc(taskRef);
         if (!taskDoc.exists()) {
           throw new Error("Task not found");
         }
         if (taskDoc.data().userId !== user.uid) {
           throw new Error("You do not have permission to update this task");
         }

        await updateDoc(taskRef, updatedTask);
    } catch (error) {
        console.error("Error updating task: ", error);
        throw error;
    }
};

export const deleteTaskFromFirestore = async (taskId) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user logged in");
        }

        const taskRef = doc(db, "todos", taskId);

        // Before deleting, verify that the current user owns the task
        const taskDoc = await getDoc(taskRef);
        if (!taskDoc.exists()) {
          throw new Error("Task not found");
        }
        if (taskDoc.data().userId !== user.uid) {
          throw new Error("You do not have permission to delete this task");
        }


        await deleteDoc(taskRef);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
};
import { getDoc } from "firebase/firestore";
