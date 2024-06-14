document.querySelector('.main-nav').addEventListener('click', function (e) {
  const target = e.target.closest('.nav-item.collapsible');
  if (!target) {
    return;
  }

  const wrapper = target.parentElement.querySelector('.nav-section-wrapper');

  const iconWrapper = target.querySelector('.collapsible-icon');
  const allIconWrappers = document.querySelectorAll('.nav-item.collapsible .collapsible-icon');
  if (iconWrapper) {
    if (iconWrapper.classList.contains('collapse')) {
      allIconWrappers.forEach((icon) => {
        icon.classList.remove('collapse');
        icon.classList.add('expand');
      });
    } else {
      iconWrapper.classList.remove('expand');
      iconWrapper.classList.add('collapse');
    }
  }
  e.currentTarget.querySelectorAll('.nav-section-wrapper').forEach((navSectionWrapper) => {
    if (navSectionWrapper !== wrapper) {
      navSectionWrapper.classList.remove('is-open');
    }
  });
  if (wrapper) {
    wrapper.classList.toggle('is-open');
  }
});

document.getElementById('nav-toggle-button-section').addEventListener('click', function (e) {
  e.currentTarget.classList.toggle('is-open');
  document.querySelector('.l-page-main-nav').classList.toggle('is-open');
});

function showAllGroups() {
  document.querySelectorAll('.nav-section').forEach((navSection) => {
    navSection.classList.remove('hidden');
  });
}

function hideEmptyGroups() {
  document.querySelectorAll('.nav-section-wrapper').forEach((navSectionWrapper) => {
    const navItems = navSectionWrapper.querySelectorAll('.nav-item:not(.hidden');
    if (navItems.length === 0) {
      navSectionWrapper.parentElement.classList.add('hidden');
    }
  });
}

function saveFilterValue(val) {
  localStorage.setItem('operations-filter', val);
}

function loadFilterValue() {
  return localStorage.getItem('operations-filter') ?? 'all';
}

function filterGroupSection(groupsSection, val) {
  if (val === 'all') {
    saveFilterValue(val);
    groupsSection.querySelectorAll('.nav-item').forEach((navItem) => {
      navItem.classList.remove('hidden');
    });
    hideEmptyGroups();
    return;
  }

  groupsSection.querySelectorAll('.nav-item').forEach((navItem) => {
    navItem.classList.remove('hidden');
  });
  const hiddenItems = groupsSection.querySelectorAll(`.nav-item[data-ns]:not([data-ns="${val}"])`);
  hiddenItems.forEach((navItem) => {
    navItem.classList.add('hidden');
  });
}

function filterNavItems(val) {
  showAllGroups();
  const groupsSection = document.querySelector(`.nav-section.group`);
  filterGroupSection(groupsSection, val);

  const otherOpsSection = document.querySelector(`.nav-section.other-operations`);
  filterGroupSection(otherOpsSection, val);

  hideEmptyGroups();

  saveFilterValue(val);
}

document.getElementById('operations-filter').addEventListener('change', function (e) {
  const val = e.target.value;
  filterNavItems(val);
});

document.addEventListener('DOMContentLoaded', function () {
  const val = loadFilterValue();
  document.getElementById('operations-filter').value = val;

  filterNavItems(val);
});
