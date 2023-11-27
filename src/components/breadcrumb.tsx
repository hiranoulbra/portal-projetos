import Link from "next/link";
import React from "react";

type BreadcrumbItem = {
    label: string;
    href?: string;
}

type BreadcrumbProps = {
    items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return <ul className="flex w-full pt-5 pl-0 pr-0 justify-start">
        <li className="mr-5 font-bold "><Link href="/">Home</Link></li>
        {items.map((item, index) => {
            if (item.href) {
                return <React.Fragment key={`breadcrumb-${index}`}>
                    <li className="mr-5">/</li>
                    <li className="mr-5 font-bold "><Link href={item.href}>{item.label}</Link></li>

                </React.Fragment>;
            }
            return <React.Fragment key={`breadcrumb-${index}`}>
                <li className="mr-5">/</li>
                <li className="mr-5 text-cyan-900">{item.label}</li>
            </React.Fragment>
        })}
    </ul>;
}