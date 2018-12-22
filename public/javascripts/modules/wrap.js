function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function unwrap(event) {
    const e = event || window.event;
    const target = e.currentTarget || e.srcElement;
    const url = target.dataset.url;

    openInNewTab(url);
}

export default unwrap;