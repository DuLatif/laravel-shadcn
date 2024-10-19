import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/ui/pagination";
import { PaginationResponse } from "@/types";
import React from "react";

export interface PaginationSectionProps {
    data?: PaginationResponse<any>;
}
const PaginationSection: React.FC<PaginationSectionProps> = ({ data }) => {
    const links = data?.links?.map((link) => (
        <PaginationItem key={link.url}>
            <PaginationLink
                href={link.url || ""}
                className={link.active ? "font-bold dark:bg-blue-800" : ""}
                dangerouslySetInnerHTML={{
                    __html: link.label.replace(/Previous|Next/, ""),
                }}
            >
                {/* {link.label} */}
            </PaginationLink>
        </PaginationItem>
    ));

    return (
        <Pagination className="w-auto">
            <PaginationContent>{links}</PaginationContent>
        </Pagination>
    );
};

export default PaginationSection;
