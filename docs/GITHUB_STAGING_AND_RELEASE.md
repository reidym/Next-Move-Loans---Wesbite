# GitHub, staging and release workflow

## Private repository ownership

Connect the project to a repository owned by the intended Next Move Loans GitHub account from **Management UI → Settings → GitHub**. Create a private repository, confirm the account or organisation owner, and give the business administrator access before treating the export as complete.

The repository should contain source code, migrations, scripts, tests and documentation. It must not contain `.env` files, database credentials, OAuth secrets, transactional-email keys or exported customer enquiries.

## Branch and review model

| Branch or environment | Purpose |
| --- | --- |
| `main` | Review-ready and release-approved source only. |
| `staging` | Optional integration branch for content-model, design or integration changes before release. |
| Short-lived feature branches | One scoped change, reviewed and merged after tests pass. |
| Manus preview/checkpoints | Primary visual staging and rollback surface for this project. |
| Published site | Production only after regulatory, email, analytics and review inputs are approved. |

Before merging a release, run `pnpm test`, `pnpm check` and `pnpm build`. Confirm mobile and desktop preview routes, verify the lead path, export CMS content, review pending migrations and save a checkpoint.

## Release and rollback

Publishing is performed from the project interface after a checkpoint exists. Do not publish from this repository documentation alone. If a code release is defective, select the last stable checkpoint in **Version history** and roll back from the interface. If content is defective but the application is healthy, unpublish the affected CMS record or restore a known export rather than rolling back unrelated code.

Database schema changes are not reverted by a code checkpoint. Every migration requires an export before execution and a forward-fix or separately reviewed rollback SQL. Never assume a source rollback restores deleted database data.

