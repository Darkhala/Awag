// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJRIW5yrVri2TG49gF4U4kuLJfHLUADPc",
    authDomain: "awag-63585.firebaseapp.com",
    projectId: "awag-63585",
    storageBucket: "awag-63585.appspot.com",
    messagingSenderId: "206963323809",
    appId: "1:206963323809:web:49911502aad8b28a8351e0",
    measurementId: "G-0MERH3L1VL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch and Display Feedback
const feedbackList = document.getElementById("feedback-list");
const allFeedbackList = document.getElementById("all-feedback");

function displayFeedback() {
    db.collection("feedbacks").orderBy("timestamp", "desc").limit(3).onSnapshot(snapshot => {
        feedbackList.innerHTML = "";
        snapshot.forEach(doc => {
            let data = doc.data();
            let div = document.createElement("div");
            div.classList.add("feedback-item");
            div.innerHTML = `<strong>${data.name}:</strong> <p>${data.feedback}</p>`;
            feedbackList.appendChild(div);
        });
    });
}

// Show All Feedback in Overlay
document.getElementById("more-feedback").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "flex";
    db.collection("feedbacks").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        allFeedbackList.innerHTML = "";
        snapshot.forEach(doc => {
            let data = doc.data();
            let div = document.createElement("div");
            div.classList.add("feedback-item");
            div.innerHTML = `<strong>${data.name}:</strong> <p>${data.feedback}</p>`;
            allFeedbackList.appendChild(div);
        });
    });
});

// Close Overlay
document.getElementById("close-overlay").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
});

// Submit Feedback
document.getElementById("feedback-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let feedback = document.getElementById("feedback").value;
    if (name && feedback) {
        db.collection("feedbacks").add({
            name: name,
            feedback: feedback,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add timestamp
        }).then(() => {
            console.log("Feedback submitted!");
            document.getElementById("name").value = "";
            document.getElementById("feedback").value = "";
        }).catch(error => {
            console.error("Error submitting feedback:", error);
        });
    }
});

// Initial Load
displayFeedback();