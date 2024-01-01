import React, { useState, useEffect } from 'react';

export type NoSsrProps = {
    children: React.ReactNode;
};

export const NoSsr = (props: NoSsrProps): React.ReactElement => {
    const [ssr, setSsr] = useState<boolean>(true);

    useEffect(() => {
        setSsr(false);
    }, []);

    return ssr ? <div>Loading...</div> : props.children;
};
