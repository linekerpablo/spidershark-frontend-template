function gravarDispositivoDoUsuario(email) {
    if (typeof Android !== "undefined" && Android !== null) {
        Android.gravarDispositivoDoUsuario(email);
    } else {
        //alert("Not viewing in webview");
    }
}