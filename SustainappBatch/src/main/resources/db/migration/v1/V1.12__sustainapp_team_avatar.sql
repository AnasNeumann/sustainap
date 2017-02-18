-- ajout d'un avatar pour les teams et modification des images des badges

ALTER TABLE TEAM
ADD AVATAR BYTEA NULL;

ALTER TABLE BADGE
DROP COLUMN  ICON;

ALTER TABLE BADGE
ADD ICON_ON VARCHAR(200) DEFAULT NULL;

ALTER TABLE BADGE
ADD ICON_OFF VARCHAR(200) DEFAULT NULL;