window.onload = function () {
    render();
};
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier..render();
}
function phoneAuth() {
    var number = document.getElementById("telnum").value;
    firebase.auth().SignInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult)
        window.confirmationResult = confirmationResult;
    coderesult = confirmationResult;
    console.log(coderesult);
    alert("message sent");
    )}.catch (function(error) {
    alert(error.message);
});
}
function codeverify() {
    var code = document.getElementById('verificationCode').value;
    console.log('code ' + code);
    coderesult.confirm(code).then(function (result) {
        alert("success");
        var user = result.user;
        console.log(user);
    }).catch(function (error) {
        alert(error.message);
    });
}