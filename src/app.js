(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function each(selector, fn) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      fn(nodes[i]);
    }
  }

  ready(function () {
    var body = document.body;
    var content = document.querySelector('.t-body');

    // control sidebar
    each('.t-head_menu', function (el) {
      el.addEventListener('click', function () {
        body.classList.add('_expand');
      });
    });
    each('.t-body, .t-sidebar_close', function (el) {
      el.addEventListener('click', function () {
        body.classList.remove('_expand');
      });
    });

    // footnote
    function getFootnoteHTML(target) {
      if (!target) {
        return null;
      }
      // docutils < 0.18 renders footnotes as tables
      var cell = target.querySelector('td.label + td');
      if (cell) {
        return cell.innerHTML;
      }
      // Sphinx < 5 with docutils < 0.18 renders footnotes as dl,
      // the reference points to the dt.label element
      if (target.tagName === 'DT') {
        var dd = target.nextElementSibling;
        return dd ? dd.innerHTML : null;
      }
      // docutils >= 0.18 renders footnotes as <aside class="footnote">
      var clone = target.cloneNode(true);
      var labels = clone.querySelectorAll('.label, .backrefs');
      for (var i = 0; i < labels.length; i++) {
        labels[i].parentNode.removeChild(labels[i]);
      }
      return clone.innerHTML;
    }

    each('a.footnote-reference', function (el) {
      el.addEventListener('click', function (e) {
        var href = el.getAttribute('href') || '';
        var id = href.replace(/^#/, '');
        var html = getFootnoteHTML(document.getElementById(id));
        if (html === null) {
          return;
        }
        e.preventDefault();

        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var style = 'top:' + e.pageY + 'px;';
        if (w > 560) {
          style += 'width:480px;';
          if (e.pageX > 240 && e.pageX + 240 < w) {
            style += 'left:' + (e.pageX - 240) + 'px;';
          } else if (e.pageX <= 240) {
            style += 'left:20px;';
          } else {
            style += 'right:20px;';
          }
        }
        showFootnote(html, style);
      });
    });

    function showFootnote(html, style) {
      var CONTENT_ID = 'typlog-footnote-content';
      var popup = document.getElementById(CONTENT_ID);
      if (!popup) {
        popup = document.createElement('div');
        popup.id = CONTENT_ID;
        content.appendChild(popup);
      }
      var MASK_ID = 'typlog-footnote-mask';
      var mask = document.getElementById(MASK_ID);
      if (!mask) {
        mask = document.createElement('div');
        mask.id = MASK_ID;
        body.appendChild(mask);
        mask.addEventListener('click', function () {
          popup.className = '';
          mask.className = '';
        });
      }

      popup.innerHTML = html;
      popup.setAttribute('style', style);
      popup.className = '_active';
      mask.className = '_active';
    }

    // github badge
    function fetchGitHubRepo(repo) {
      var url = 'https://api.github.com/repos/' + repo;
      fetch(url).then(function (resp) {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      }).then(function (data) {
        var counts = [+new Date(), data.stargazers_count, data.forks_count];
        try {
          localStorage.setItem('gh:' + repo, JSON.stringify(counts));
        } catch (error) {}
        updateGitHubStats(counts[1], counts[2]);
      }).catch(function () {});
    }

    function updateGitHubStats(stars, forks) {
      each('.github_stars strong', function (el) { el.textContent = stars; });
      each('.github_forks strong', function (el) { el.textContent = forks; });
    }

    function initGitHub(link) {
      if (!link || typeof fetch !== 'function') {
        return;
      }
      var repo = link.getAttribute('href').replace('https://github.com/', '');
      var cache = null;
      try {
        cache = localStorage.getItem('gh:' + repo);
      } catch (error) {}
      if (cache) {
        try {
          var counts = JSON.parse(cache);
          updateGitHubStats(counts[1], counts[2]);
          var delta = new Date() - counts[0];
          if (delta < 0 || delta > 900000) {
            fetchGitHubRepo(repo);
          }
        } catch (error) {
          fetchGitHubRepo(repo);
        }
      } else {
        fetchGitHubRepo(repo);
      }
    }

    initGitHub(document.querySelector('a.github'));
  });
})();
