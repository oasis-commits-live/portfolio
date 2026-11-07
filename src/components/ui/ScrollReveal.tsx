import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'blur-in'
  | 'fade';

export interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'variant'> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  viewportAmount?: number | 'some' | 'all';
  viewportMargin?: string;
}

const getVariants = (
  variant: RevealVariant = 'fade-up',
  distance = 32,
  duration = 0.75,
  delay = 0
): Variants => {
  const transition = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // Quintic deceleration for refined luxury feel
  };

  switch (variant) {
    case 'fade-up':
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition },
      };
    case 'fade-down':
      return {
        hidden: { opacity: 0, y: -distance },
        visible: { opacity: 1, y: 0, transition },
      };
    case 'fade-left':
      return {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0, transition },
      };
    case 'fade-right':
      return {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0, transition },
      };
    case 'scale-up':
      return {
        hidden: { opacity: 0, scale: 0.94, y: 16 },
        visible: { opacity: 1, scale: 1, y: 0, transition },
      };
    case 'blur-in':
      return {
        hidden: { opacity: 0, filter: 'blur(8px)', y: 20 },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition },
      };
    case 'fade':
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition },
      };
  }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.75,
  distance = 32,
  className = '',
  once = true,
  viewportAmount = 0.15,
  viewportMargin = '0px 0px -40px 0px',
  ...rest
}) => {
  const chosenVariant: RevealVariant = (variant as RevealVariant) || 'fade-up';
  const variants = getVariants(chosenVariant, distance, duration, delay);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount, margin: viewportMargin }}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
  viewportAmount?: number | 'some' | 'all';
  viewportMargin?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.05,
  className = '',
  once = true,
  viewportAmount = 0.12,
  viewportMargin = '0px 0px -40px 0px',
  ...rest
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount, margin: viewportMargin }}
      variants={containerVariants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  distance = 24,
  ...rest
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
};
