/* 田舎野菜 : メニュー開閉 */
(function () {
	var btn = document.querySelector('.menu-btn');
	var nav = document.getElementById('gnav');
	if (!btn || !nav) return;
	function close() { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
	btn.addEventListener('click', function () {
		var open = nav.classList.toggle('is-open');
		btn.setAttribute('aria-expanded', open ? 'true' : 'false');
	});
	nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
	document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
