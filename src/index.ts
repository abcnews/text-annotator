import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';

let appMountEl: Mount;

const CLASS_BASE = 'text-annotator';

function getconfigFromString(brace) {
  if (!brace) {
    return;
  }
  const braces = Array.isArray(brace) ? brace : [brace];
  const configs = braces.map(config => {
    const [, type, hexCodeFg, hexCodeBg, textString] = (config.match(/^(...)(......)(......)x(.*)$/) || []);
    return {
      type,
      hexCodeFg: `#${hexCodeFg}`,
      hexCodeBg: hexCodeBg === 'xxxxxx' ? null : `#${hexCodeBg}`,
      textString
    };
  });
  return configs || [];

}

function renderApp() {
  const [mount] = selectMounts('textannotator');
  if (!mount) return;
  const configs = getconfigFromString(acto(mount.id).brace) || []
  const targets = document.querySelectorAll('em');

  // Go through each annotation and annotate it
  Array.from(targets).forEach(annotation => {
    const originalText = annotation.textContent || '';
    const [, newText, textString] = (originalText.match(/(.*)\((.*)\)$/) || []);
    const config = configs.find(config => config.textString === textString);
    if (!config) {
      return;
    }

    const newEl = document.createElement('span');
    newEl.textContent = newText.trim();
    newEl.classList.add(CLASS_BASE);
    newEl.dataset.annotation = textString;

    if (config.type === 'txt') {
      Object.assign(newEl.style, {
        background: config.hexCodeBg,
        color: config.hexCodeFg,
        fontWeight: 'bold',
        ...(config.hexCodeBg && {
          padding: '2px 8px'
        })
      })
    }
    if (config.type === 'box') {
      const el = document.createElement('span');
      Object.assign(el.style, {
        display: 'inline-block',
        background: config.hexCodeFg,
        border: `1px solid ${config.hexCodeBg}`,
        width: '8px',
        height: '8px',
        margin: '0 0 0 0.2em',
      });
      newEl.appendChild(el)
    }

    annotation.replaceWith(newEl)

  })
}

renderApp()

whenOdysseyLoaded.then(() => {

  renderApp();
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[text-annotator] public path: ${__webpack_public_path__}`);
}
