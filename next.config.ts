import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  allowedDevOrigins: ["192.168.68.60"],
};

export default withNextIntl(nextConfig);
