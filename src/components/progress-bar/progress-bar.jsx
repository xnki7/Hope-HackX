import { Progress } from '@nextui-org/react';

export default function ProgressBar() {
    return (
        <Progress
            size="sm"
            radius="sm"
            classNames={{
                base: 'max-w-md',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-gradient-to-r from-secondary to-primary',
                label: 'tracking-wider font-medium text-default-600',
                value: 'text-foreground/60',
            }}
            label={`Goal: 2 matic`}
            value={65}
            showValueLabel={true}
        />
    );
}
