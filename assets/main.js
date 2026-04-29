/* ── FonLang — Highlight.js language definition ──────────────────────────── */

hljs.registerLanguage('fon', function(hljs) {
  const KEYWORDS = [
    'jo', 'azɔwanu', 'lɛkɔ',
    'enyi', 'alo', 'sin', 'ɖo', 'hwenue', 'blo', 'bɔdewu',
    'nɔte', 'gbɔ', 'dɔte', 'yinukɔn',
    'blokpɔn', 'wli', 'kplawa',
    'kɛn', 'wekwin', 'wemawlanxwlɛ', 'tablo',
    'kpodo', 'abi'
  ];

  const LITERALS = ['nugbo', 'nuvu', 'vɔ', 'vɔtɔ', 'gbogbe'];

  const BUILTINS = [
    'xlɛ', 'xlɛf', 'xa',
    'mli', 'plancher', 'plafond', 'abs', 'racine', 'puissance', 'ɖaxo_bi', 'kpɛvi_bi',
    'sinus', 'cosinus', 'tanjante', 'cotanjante',
    'gaɖiɖi', 'gɔna', 'klan',
    'wekwin_daxo', 'wekwin_kpɛvi', 'trim', 'contient', 'eɖyɔ',
    'ebεsin', 'efodo',
    'kɛn', 'wekwin', 'toString', 'toInt', 'toBool',
    'egbe', 'azan', 'gan', 'nukunxwixwe',
    'nukpedonunu',
    'http_get', 'http_post',
    'wema_xa', 'wema_ecrire', 'wema_eɖe', 'wema_sunsun',
    'json_ecrire', 'json_xa'
  ];

  return {
    name: 'FonLang',
    aliases: ['fon'],
    keywords: {
      keyword:  KEYWORDS.join(' '),
      literal:  LITERALS.join(' '),
      built_in: BUILTINS.join(' ')
    },
    contains: [
      hljs.COMMENT('//', '$'),
      hljs.COMMENT('/\\*', '\\*/'),
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [{ begin: '\\\\.' }]
      },
      {
        className: 'number',
        begin: /\b\d+(\.\d+)?\b/
      },
      {
        className: 'title',
        begin: /\bazɔwanu\s+[a-zA-ZÀ-ÖØ-öø-ÿɖɔɛ_][a-zA-Z0-9ÀÖØöøÿɖɔɛ_]*/
      }
    ]
  };
});

/* ── Initialize highlight.js ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  // Highlight all code blocks
  document.querySelectorAll('pre code').forEach(function (block) {
    if (!block.className) block.className = 'language-fon';
    hljs.highlightElement(block);
  });

  // Copy button
  document.querySelectorAll('.code-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const pre = btn.closest('.code-block').querySelector('pre');
      navigator.clipboard.writeText(pre.innerText).then(function () {
        btn.textContent = 'Copié !';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copier';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // Sidebar active link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
    if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href').replace(/^\.\.\//, ''))) {
      link.classList.add('active');
    }
  });

  // Mobile sidebar toggle
  const menuBtn = document.querySelector('.topbar-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.createElement('div');
  overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99';
  document.body.appendChild(overlay);

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.style.display = 'none';
    });
  }
});

/* ── Shared sidebar HTML ─────────────────────────────────────────────────── */
function renderSidebar(root) {
  const r = root || '';
  document.querySelector('.sidebar').innerHTML = `
    <div class="sidebar-brand">
      <a href="${r}index.html">
        <div class="brand-logo">F</div>
        <div>
          <div class="brand-name">FonLang</div>
          <div class="brand-version">v0.1.0-alpha</div>
        </div>
      </a>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">Guide</div>
      <a href="${r}guide/demarrage.html">Démarrage rapide</a>
      <a href="${r}guide/controle.html">Structures de contrôle</a>
      <a href="${r}guide/fonctions.html">Fonctions</a>
      <a href="${r}guide/collections.html">Collections</a>
      <a href="${r}guide/stdlib.html">Bibliothèques standard</a>
      <a href="${r}guide/gui.html">Interface graphique</a>

      <div class="nav-section">Référence</div>
      <a href="${r}reference/mots-cles.html">Mots-clés</a>
      <a href="${r}reference/types.html">Types de données</a>
      <a href="${r}reference/operateurs.html">Opérateurs</a>
      <a href="${r}reference/stdlib.html">Stdlib — référence</a>

      <div class="nav-section">Exemples</div>
      <a href="${r}examples/index.html">Galerie d'exemples</a>
    </nav>
    <div class="sidebar-footer">
      Documentation rédigée par <strong style="color:#f1f5f9">AWADEME Finanfa Ronaldo</strong><br>
      FonLang — projet communautaire porté par sa communauté
    </div>
  `;

  // Re-apply active link after render
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace(/^(\.\.\/)+/, ''))) {
      link.classList.add('active');
    }
  });
}
