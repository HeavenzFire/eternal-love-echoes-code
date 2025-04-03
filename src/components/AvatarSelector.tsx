
import React from 'react';
import DigitalAvatar from '@/components/DigitalAvatar';
import { Sparkles, Brain, Compass, Stars, Zap, School } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onKnowledgePanelToggle: () => void;
  onCodeEditorToggle: () => void;
  onVisioNETToggle: () => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  onKnowledgePanelToggle,
  onCodeEditorToggle,
  onVisioNETToggle
}) => {
  const getIconForAvatar = (avatar: string) => {
    switch (avatar) {
      case "einstein":
        return <Brain className="h-8 w-8" />;
      case "tesla":
        return <Zap className="h-8 w-8" />;
      case "yeshua":
        return <Stars className="h-8 w-8" />;
      case "socrates":
        return <School className="h-8 w-8" />;
      case "pythagoras":
        return <Compass className="h-8 w-8" />;
      case "newton":
        return <Sparkles className="h-8 w-8" />;
      default:
        return <Stars className="h-8 w-8" />;
    }
  };

  if (selectedAvatar === "einstein") {
    return (
      <DigitalAvatar
        name="Einstein"
        greeting="The universe is full of magical things patiently waiting for our wits to grow sharper."
        backgroundColor="bg-slate-800"
        foregroundColor="text-slate-50"
        animation="sparkle"
        onInteract={onKnowledgePanelToggle}
        icon={getIconForAvatar("einstein")}
      />
    );
  } else if (selectedAvatar === "tesla") {
    return (
      <DigitalAvatar
        name="Tesla"
        greeting="The present is theirs; the future, for which I really worked, is mine."
        backgroundColor="bg-gray-900"
        foregroundColor="text-blue-100"
        animation="pulse"
        onInteract={onCodeEditorToggle}
        icon={getIconForAvatar("tesla")}
      />
    );
  } else if (selectedAvatar === "yeshua") {
    return (
      <DigitalAvatar
        name="Yeshua"
        greeting="Love your neighbor as yourself; there is no greater commandment than this."
        backgroundColor="bg-indigo-900"
        foregroundColor="text-amber-100"
        animation="sparkle"
        onInteract={onVisioNETToggle}
        icon={getIconForAvatar("yeshua")}
      />
    );
  } else if (selectedAvatar === "socrates") {
    return (
      <DigitalAvatar
        name="Socrates"
        greeting="The only true wisdom is in knowing you know nothing."
        backgroundColor="bg-blue-900"
        foregroundColor="text-white"
        animation="pulse"
        onInteract={onKnowledgePanelToggle}
        icon={getIconForAvatar("socrates")}
      />
    );
  } else if (selectedAvatar === "pythagoras") {
    return (
      <DigitalAvatar
        name="Pythagoras"
        greeting="Number is the ruler of forms and ideas, and the cause of gods and demons."
        backgroundColor="bg-purple-900"
        foregroundColor="text-purple-100"
        animation="sparkle"
        onInteract={onKnowledgePanelToggle}
        icon={getIconForAvatar("pythagoras")}
      />
    );
  } else if (selectedAvatar === "newton") {
    return (
      <DigitalAvatar
        name="Newton"
        greeting="If I have seen further, it is by standing on the shoulders of giants."
        backgroundColor="bg-green-900"
        foregroundColor="text-green-100"
        animation="pulse"
        onInteract={onKnowledgePanelToggle}
        icon={getIconForAvatar("newton")}
      />
    );
  } else if (selectedAvatar === "jung") {
    return (
      <DigitalAvatar
        name="Jung"
        greeting="Your vision will become clear only when you can look into your own heart."
        backgroundColor="bg-red-900"
        foregroundColor="text-red-100"
        animation="sparkle"
        onInteract={onKnowledgePanelToggle}
        icon={<School className="h-8 w-8" />}
      />
    );
  } else if (selectedAvatar === "lao-tzu") {
    return (
      <DigitalAvatar
        name="Lao Tzu"
        greeting="Nature does not hurry, yet everything is accomplished."
        backgroundColor="bg-emerald-900"
        foregroundColor="text-emerald-100"
        animation="pulse"
        onInteract={onKnowledgePanelToggle}
        icon={<Stars className="h-8 w-8" />}
      />
    );
  }
  
  // Default avatar
  return (
    <DigitalAvatar
      name="Visionary"
      greeting="The wisdom of the ages is now at your fingertips."
      backgroundColor="bg-slate-800"
      foregroundColor="text-slate-50"
      animation="sparkle"
      onInteract={onVisioNETToggle}
      icon={<Stars className="h-8 w-8" />}
    />
  );
};

export default AvatarSelector;
