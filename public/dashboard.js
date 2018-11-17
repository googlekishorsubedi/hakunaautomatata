const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var User;

firebase.auth().onAuthStateChanged(function(user){
    console.log("authentication changed");
    if(user){
        printName(user);
    }
    var user = firebase.auth().currentUser;
    var emailRef = firestore.collection("users").doc(user.uid);
    emailRef.get().then(function(doc) {
        if (doc.exists) {
            document.getElementById("name").innerHTML = doc.data().username;
        } else {
                // doc.data() will be undefined in this case
                alert("User not found");
        }
        }).catch(function(error) {
                console.log("Error getting document:", error);
        });

    // var username = firebase.collection("users").doc(user.uid).get()
})

function printName(user){
    document.getElementById("name").innerHTML = user.displayName;
}


function signOut(){

    firebase.auth().signOut().then(function() {
        document.location.href = "index.html";
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });

}