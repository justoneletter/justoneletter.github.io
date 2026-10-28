document.documentElement.classList.add('js');
const tabs = [...document.querySelectorAll('[role="tab"]')];
const selectApp = (tab, focus = false) => {
  for (const item of tabs) {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
  if (focus) tab.focus();
};
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectApp(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectApp(tabs[next], true); }
  });
});
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('visible'); observer.unobserve(entry.target);
    }
  }, { threshold: .08 });
  reveals.forEach(item => observer.observe(item));
} else reveals.forEach(item => item.classList.add('visible'));
document.getElementById('year').textContent = new Date().getFullYear();
