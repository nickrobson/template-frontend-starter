// @ts-check

/**
 * Config types
 *
 * @typedef {Set<(string | null)>} ScopesConfig
 */

/**
 * Allowed scopes for public packages.
 * Include null at the end of the list if packages without a scope should be public.
 *
 * Examples:
 * - `['@scope']`: public packages should have the `@scope` scope
 * - `['@scope1', '@scope2']`: public packages should either have the `@scope1` scope or the `@scope2` scope
 * - `[null]`: public packages should have no scope
 * - `['@scope', null]`: public packages should either have the `@scope` scope or no scope
 *
 * @type {ScopesConfig}
 */
const PUBLIC_SCOPES = new Set(['@nickrobson', null]);

/**
 * Allowed scopes for private packages.
 * Include null at the end of the list if packages without a scope should be private.
 *
 * Examples:
 * - `['@scope']`: private packages should have the `@scope` scope
 * - `['@scope1', '@scope2']`: private packages should either have the `@scope1` scope or the `@scope2` scope
 * - `[null]`: private packages should have no scope
 * - `['@scope', null]`: private packages should either have the `@scope` scope or no scope
 *
 * @type {ScopesConfig}
 */
const PRIVATE_SCOPES = new Set(['@template-frontend-starter', '@repo']);

// --- begin config validation --- //

{
  const scopesInBoth = new Set();
  PUBLIC_SCOPES.forEach((scope) => {
    if (PRIVATE_SCOPES.has(scope)) {
      scopesInBoth.add(scope);
    }
  });
  if (scopesInBoth.size > 0) {
    throw new Error(
      `PUBLIC_SCOPES and PRIVATE_SCOPES contain overlapping items: ${[
        ...scopesInBoth,
      ]
        .map((it) => it || '(none)')
        .join(', ')}`
    );
  }
  [...PUBLIC_SCOPES, ...PRIVATE_SCOPES].forEach((scope) => {
    if (scope !== null && scope.indexOf('@') !== 0)
      throw new Error(`"${scope}" is invalid scope`);
  });
}

// --- begin constraints code --- //

/**
 * @typedef {import('@yarnpkg/types').Yarn.Constraints.Context} Context
 * @typedef {import('@yarnpkg/types').Yarn.Constraints.Dependency} Dependency
 * @typedef {import('@yarnpkg/types').Yarn.Constraints.Workspace} Workspace
 */

/**
 *
 * @param {Context} ctx
 * @param {Workspace} workspace
 */
function checkPackageName(ctx, workspace) {
  if (!workspace.ident) {
    workspace.error(`Package name required in ./${workspace.cwd}/package.json`);
    return;
  }

  const slashIndex = workspace.ident.indexOf('/');
  const scope =
    slashIndex >= 0 ? workspace.ident.substring(0, slashIndex) : null;
  if (PUBLIC_SCOPES.has(scope)) {
    workspace.set('private', false);
  } else if (PRIVATE_SCOPES.has(scope)) {
    workspace.set('private', true);
  } else {
    let errorMessage =
      scope == null
        ? `Name has no scope, which is not allowed\n`
        : `Name has disallowed scope ${scope}\n`;
    if (PUBLIC_SCOPES.size > 0) {
      const allowedPublicScopes = Array.from(PUBLIC_SCOPES)
        .map((it) => it || '(none)')
        .join(', ');
      errorMessage += `Allowed public package scopes: ${allowedPublicScopes}\n`;
    }
    if (PRIVATE_SCOPES.size > 0) {
      const allowedPrivateScopes = Array.from(PRIVATE_SCOPES)
        .map((it) => it || '(none)')
        .join(', ');
      errorMessage += `Allowed private package scopes: ${allowedPrivateScopes}\n`;
    }
    workspace.error(errorMessage.trim());
  }
}

const { defineConfig } = require('@yarnpkg/types');
module.exports = defineConfig({
  async constraints(ctx) {
    const { Yarn } = ctx;

    const rootWorkspace = Yarn.workspace({ cwd: '.' });
    for (const workspace of Yarn.workspaces()) {
      if (workspace.cwd === '.') {
        // Root workspace is already validated by this point
        continue;
      }

      checkPackageName(ctx, workspace);
    }

    for (const dependency of Yarn.dependencies()) {
      if (dependency.type === 'dependencies') {
        // Dependencies should be declared in dependencies or dev dependencies, but not both
        Yarn.dependency({
          workspace: dependency.workspace,
          ident: dependency.ident,
          type: 'devDependencies',
        })?.delete();
      }

      const dependencyWorkspace = Yarn.workspace({ ident: dependency.ident });
      if (dependencyWorkspace != null) {
        dependency.update('workspace:*');

        if (
          !dependency.workspace.manifest.private && // package is public
          dependencyWorkspace.manifest.private // package it depends on is private
        ) {
          dependency.error(`Public package depends on private package`);
        }
      }
    }
  },
});
