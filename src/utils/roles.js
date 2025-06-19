const roleMap = {
  Administrador: 'Admin',
  'Líder Comunitario': 'Community_Leader',
  'Líder de Calle': 'Street_Leader',
}

/**
 * Get the role key from the readable name (e.g., "Admin" → "Administrador")
 * @param {string} key - The role key (e.g., "Admin")
 * @returns {string} - The role readable name (e.g., "Administrador")
 */
export const getRoleNameByKey = (key) => {
  return Object.keys(roleMap).find((name) => roleMap[name] === key) || ''
}
