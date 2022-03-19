% Remove dependencies from devDependencies if they exist in dependencies
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'dependencies'),
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'devDependencies').

% Require all workspaces' dependencies to also be declared in the root
gen_enforced_dependency('.', DependencyIdent, DependencyRange, DependencyType) :-
  % For any given workspace other than the root declaring a dependency
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  % And the dependency is not a workspace
  \+ workspace_ident(_, DependencyIdent),
  % And the root does not declare that dependency (with any range)
  \+ workspace_has_dependency('.', DependencyIdent, _, DependencyType).

% Set workspaces' dependency versions to the same version as defined in the root
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, RootDependencyRange, DependencyType) :-
  % For any given workspace other than the root declaring a dependency (with some range)
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, PkgDependencyRange, DependencyType),
  % And the root package.json declares a different version of the dependency
  workspace_has_dependency('.', DependencyIdent, RootDependencyRange, _),
  PkgDependencyRange \= RootDependencyRange.

% Require declaring all inter-workspace dependencies with version "workspace:*"
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:*', DependencyType) :-
  % For any given workspace's package name
  workspace_ident(_, DependencyIdent),
  % And any workspace declaring a depedency on that package name
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, DependencyType).

% Require workspace dependencies to be declared as dependencies in the root
gen_enforced_dependency('.', DependencyIdent, DependencyRange, 'dependencies') :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, 'dependencies'),
  \+ workspace_ident(_, DependencyIdent),
  \+ workspace_has_dependency('.', DependencyIdent, _, 'dependencies').

% Require workspace devDependencies to be declared as dependencies or devDependencies in the root
gen_enforced_dependency('.', DependencyIdent, DependencyRange, 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, 'devDependencies'),
  \+ workspace_ident(_, DependencyIdent),
  \+ (
    workspace_has_dependency('.', DependencyIdent, _, 'dependencies') ;
    workspace_has_dependency('.', DependencyIdent, _, 'devDependencies')
  ).