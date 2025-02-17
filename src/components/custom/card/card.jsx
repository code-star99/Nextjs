/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { CardImage } from "@/components/custom/card/card_image";
import { CardBadges } from "@/components/custom/card/card_badges";
import Button from "../button";

const Card = React.forwardRef(
  (
    {
      className,
      title,
      description,
      buttonText,
      buttonURL,
      imageSRC = "/images/projects/placeholder.png",
      badges = [],
      ...props
    },
    ref,
  ) => {
    const cardClassName = cn("rounded-xl hover-card", className);

    return (
      <div
        ref={ref}
        className={cardClassName}
        style={{ width: "18rem" }}
        {...props}
      >
        <div className="hover-glow absolute inset-0 pointer-events-none"></div>
        <div className="rotating-glow absolute inset-0 pointer-events-none"></div>

        {imageSRC && <CardImage imageSRC={imageSRC} title={title} />}

        <div className="p-6">
          <CardBadges badges={badges} />

          {title && (
            <h5 className="c-cursor-text glow text-xl font-semibold mb-2">
              {title}
            </h5>
          )}

          {description && (
            <p className="c-cursor-text glow text-muted-foreground mb-4">
              {description}
            </p>
          )}

          {buttonText && buttonURL && (
            <div className="flex justify-center mt-4">
              <Button href={buttonURL} variant="secondary" newTab={true}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  },
);
Card.displayName = "Card";

export { Card };
