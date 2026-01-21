# Version View throws useLocale() server error in Payload 3.72

## Description of the issue

When navigating to the version view of any document with versions enabled, the following error is thrown:

```
Error: Attempted to call useLocale() from the server but useLocale is on the client.
It's not possible to invoke a client function from the server, it can only be rendered
as a Component or passed to props of a Client Component.
    at <unknown> (.next/server/app/(payload)/admin/[[...segments]]/page.js:337:248161)
    at <unknown> (.next/server/app/(payload)/admin/[[...segments]]/page.js:415:28468)
    at <unknown> (.next/server/app/(payload)/admin/[[...segments]]/page.js:415:29043)
    at Array.map (<anonymous>)
    at _ (.next/server/app/(payload)/admin/[[...segments]]/page.js:415:28331) {
  digest: '820230443'
}
```

The issue was introduced in Payload 3.72.0 (3.71.x works fine).

### Root Cause

The issue was introduced in PR https://github.com/payloadcms/payload/pull/14667. Inside `getVersionLabel.ts`, the `useLocale` hook is being called in a server context. When the `useLocale` call is removed, the error disappears.

`useLocale` is a React client hook and cannot be called from server components or server-side code.

## Link to the code

https://github.com/payloadcms/payload/blob/main/packages/ui/src/utilities/getVersionLabel.ts

## Reproduction Steps

1. Clone the reproduction repository and run the development server with `pnpm dev`
2. Navigate to `/admin` and log in (create an account if needed)
3. Go to the Posts collection and create a new post with a title
4. Save the post as draft or publish it
5. Click on "Versions" in the document sidebar or navigate to the versions view
6. Observe the error being thrown

## Environment Info

```
Binaries:
  Node: 24.3.0
  npm: 11.4.2
  Yarn: 1.22.22
  pnpm: 10.28.1
Relevant Packages:
  payload: 3.72.0
  next: 15.4.10
  @payloadcms/db-mongodb: 3.72.0
  @payloadcms/graphql: 3.72.0
  @payloadcms/next/utilities: 3.72.0
  @payloadcms/richtext-lexical: 3.72.0
  @payloadcms/translations: 3.72.0
  @payloadcms/ui/shared: 3.72.0
  react: 19.2.1
  react-dom: 19.2.1
Operating System:
  Platform: darwin
  Arch: arm64
```
