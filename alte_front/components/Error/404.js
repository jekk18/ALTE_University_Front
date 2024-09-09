import { useTranslations } from "@/core/Translations/context";
import Link from "next/link";

export default function NotFound404() {
    const translations = useTranslations();
    return (
        <div className="container d-flex flex-column gap-5 align-items-center justify-content-center error-page"
            style={{
                minHeight: 500,
            }}>
            <h1>{translations?.page_not_found}</h1>
            <Link href={'/'} className="apply-button">
                {translations?.return_to_main}
            </Link>
        </div>
    );
}