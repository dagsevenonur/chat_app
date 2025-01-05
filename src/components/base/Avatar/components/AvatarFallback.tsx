import { Component, ReactNode } from 'react';
import { AvatarSize } from '../AvatarTypes';
import { getFallbackStyles } from '../styles';
import { User } from 'lucide-react';

interface AvatarFallbackProps {
  size: AvatarSize;
  fallback?: ReactNode;
  fallbackText?: string;
}

class AvatarFallback extends Component<AvatarFallbackProps> {
  private getInitials(text: string): string {
    return text
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  render() {
    const { size, fallback, fallbackText } = this.props;

    return (
      <div className={getFallbackStyles(size)}>
        {fallback || (
          fallbackText ? (
            <span className="text-muted-foreground">
              {this.getInitials(fallbackText)}
            </span>
          ) : (
            <User className="h-3/5 w-3/5 text-muted-foreground" />
          )
        )}
      </div>
    );
  }
}

export default AvatarFallback; 