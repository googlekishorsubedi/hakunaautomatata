const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var User;
var sign_out = document.getElementById('signout');


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

function linkGoogleAccount()
{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
        // Accounts successfully linked.
        var credential = result.credential;
        var user = result.user;
        alert("linking successful");
        // ...
      }).catch(function(error) {
          alert("Error linking");
        // Handle Errors here.
        // ...
      });
}

sign_out.addEventListener('click', function(){

firebase.auth().signOut().then(function() {
    document.location.href = "index.html";
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });

});