## DB Initialization script

docker run --name postgres-server \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_DB=valahiarp \
 -p 5432:5432 \
 -v postgres-server-data:/var/lib/postgresql/data \
 -d postgres

Can be run on any terminal, on any machine if you have docker engine installed.

## Folder structure

In src directory we will add a folder for each category of files (ex. constants, models, utils, hooks, schemas, data etc..). This files can contain sub folders with names like invoices, subscriptions, etc in order to separate them. The root file will be named index.ts (I added a example for data folder).

## Prisma entities

In prisma directory we will add a file for each entity (ex. user.prisma, subscription.prisma, invoice.prisma etc..). The root file will be named schema.prisma (I added a example for user entity).

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## LocalStack CORS Configuration

For the application to be able to upload files to the LocalStack S3 bucket, you need to apply the following CORS configuration.

```bash
curl -k -X PUT "https://localhost.localstack.cloud:4566/valahiarp?cors" \
  -H "Content-Type: application/xml" \
  -d '<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>'
```

test