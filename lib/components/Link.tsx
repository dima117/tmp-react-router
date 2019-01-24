import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { callHistoryMethod } from '../actions';

interface OwnProps {
    href: string;
    target?: string;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

interface DispatchProps {
    onNavigate: (url: string) => void;
}

function isModifiedEvent(event: React.MouseEvent) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class LinkComponent extends React.Component<OwnProps & DispatchProps> {
    handleClick = (event: React.MouseEvent) => {
        const { target, href, onClick, onNavigate } = this.props;

        if (onClick) {
            onClick(event);
        }

        if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0 && // ignore everything but left clicks
            (!target || target === '_self') && // let browser handle "target=_blank" etc.
            !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
            event.preventDefault();
            onNavigate(href);
        }
    };

    render() {
        const { href, target, className, children } = this.props;

        return (
            <a
                className={className}
                href={href}
                target={target}
                onClick={this.handleClick}
            >
                {children}
            </a>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({ 
    onNavigate: (href: string) => dispatch(callHistoryMethod(href))
});

export const Link = connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(LinkComponent);