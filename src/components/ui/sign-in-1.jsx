import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * A reusable authentication form component built with shadcn/ui.
 * It supports various providers, a customizable header, and animations.
 */
const AuthForm = React.forwardRef(
    (
        {
            className,
            logoSrc,
            logoAlt = "Company Logo",
            title,
            description,
            primaryAction,
            secondaryActions,
            skipAction,
            footerContent,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn("flex flex-col items-center justify-center", className)}>
                <Card
                    ref={ref}
                    className={cn(
                        "w-full max-w-sm rounded-3xl border shadow-sm",
                        "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500",
                        className
                    )}
                    {...props}
                >
                    <CardHeader className="text-center pb-2">
                        {/* Logo */}
                        <div className="mb-6 flex justify-center">
                            <img src={logoSrc} alt={logoAlt} className="h-14 w-14 object-contain rounded-2xl shadow-sm" />
                        </div>
                        <CardTitle className="text-3xl font-serif font-bold tracking-tight">{title}</CardTitle>
                        {description && <CardDescription className="mt-2 text-base font-medium">{description}</CardDescription>}
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {/* Primary Action Button */}
                        <Button onClick={primaryAction.onClick} className="w-full py-6 text-base font-medium shadow-sm hover:shadow-md transition-all hover:scale-[1.01]">
                            {primaryAction.icon}
                            {primaryAction.label}
                        </Button>

                        {/* "OR" separator */}
                        {secondaryActions && secondaryActions.length > 0 && (
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-6 text-muted-foreground font-semibold tracking-wider z-10">
                                        or continue with
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Secondary Action Buttons */}
                        <div className="grid gap-2">
                            {secondaryActions?.map((action, index) => (
                                <Button key={index} variant="secondary" className="w-full transition-transform hover:scale-[1.03]" onClick={action.onClick}>
                                    {action.icon}
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    </CardContent>

                    {/* Skip Action Button */}
                    {skipAction && (
                        <CardFooter className="flex flex-col">
                            <Button variant="outline" className="w-full transition-transform hover:scale-[1.03]" onClick={skipAction.onClick}>
                                {skipAction.label}
                            </Button>
                        </CardFooter>
                    )}
                </Card>

                {/* Footer */}
                {footerContent && (
                    <div className="mt-6 w-full max-w-sm px-8 text-center text-sm text-muted-foreground animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500 [animation-delay:200ms]">
                        {footerContent}
                    </div>
                )}
            </div>
        );
    }
);
AuthForm.displayName = "AuthForm";

export { AuthForm };
