const xRight = (key, endPoint) => {
  if (!endPoint) endPoint = key;
  return { key, endPoint };
};
export const _accessRights = [
  {
    className: `Dashboard`,
    ns: `dashboard`,
    rights: [xRight(`list`)],
  },
  {
    className: `AccessRole`,
    ns: `accessRole`,
    rights: [
      { key: `list`, endPoint: `list` },
      { key: `create`, endPoint: `add` },
      { key: `get`, endPoint: `get` },
      { key: `update`, endPoint: `update` },
      xRight(`addRight`),
      xRight(`deleteRight`),
    ],
  },
  {
    className: `User`,
    ns: `user`,
    rights: [
      xRight(`basicList`),
      xRight(`list`),
      { key: `get`, endPoint: `get` },
      { key: `update`, endPoint: `update` },
      { key: `uploadProfilePic`, endPoint: `uploadProfilePic` },
      { key: `connectGoogleCalendar`, endPoint: `connectGoogleCalendar` },

      xRight(`assignRole`),
    ],
  },
  {
    className: `Customer`,
    ns: `customer`,
    rights: [
      xRight(`list`),
      { key: `get`, endPoint: `get` },
      { key: `update`, endPoint: `update` },

      xRight(`assignRole`),
    ],
  },
  {
    className: `AccessRights`,
    ns: `accessRight`,
    rights: [{ key: `list`, endPoint: `list` }],
  },
];

export const validateRight = (className, key) => {
  const classObj = _accessRights.find((r) => r.className === className);
  if (!classObj) return false;
  const right = classObj.rights.find((r) => r.key === key);
  if (!right) return false;
  return true;
};
export const getAccessRight = (subNsStart, endPoint) => {
  console.log(`getAccessRight?`, subNsStart, endPoint);
  // const classObj = _accessRights.find((r) => subNsStart.startsWith(r.ns));

  const classObj = _accessRights.find((r) => subNsStart === r.ns);
  if (!classObj) return null;
  const right = classObj.rights.find((r) => r.endPoint === endPoint);
  if (!right) return null;
  right.className = classObj.className;
  right.ns = classObj.ns;
  return right;
};
export const _salesPurposes = [`Sales`];
export const _inventoryPolicy = [`FIFO`, `Specific`];
