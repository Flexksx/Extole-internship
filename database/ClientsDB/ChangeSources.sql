-- database: /home/cristi/Documents/practica/database/ClientDB/Clients.db
UPDATE records
SET
    source = CASE
        WHEN source LIKE '%extole-blast%' THEN 'extole-blast'
        WHEN source LIKE '%mail%' THEN 'mail'
        WHEN source LIKE '%footer%' THEN 'footer'
        WHEN source LIKE '%header%' THEN 'header'
        WHEN source LIKE '%popup%' THEN 'popup'
        WHEN source LIKE '%sidebar%' THEN 'sidebar'
        WHEN source LIKE '%confirm%' THEN 'confirm'
        WHEN source LIKE '%holiday%' THEN 'holiday'
        WHEN source LIKE '%friend%' THEN 'friend_referal'
        WHEN source LIKE '%referral_page%' THEN 'referal_page'
        WHEN source LIKE '%app-settings%' THEN 'app-settings'
        WHEN source LIKE '%app%' THEN 'app'
        WHEN source LIKE '%banner%' THEN 'banner'
        WHEN source LIKE '%widget%' THEN 'widget'
        WHEN source LIKE '%reward%' THEN 'reward'
        WHEN source LIKE '%checkout%' THEN 'checkout'
        WHEN source LIKE '%refer%' THEN 'refer'
        WHEN source LIKE '%business%%partner%' THEN 'business_partner'
        WHEN source LIKE '%newsletter%' THEN 'newsletter'
        WHEN source LIKE '%account%%page%' THEN 'account_page'
        WHEN source LIKE '%gift%%card%' THEN 'gift_card'
        WHEN source LIKE '%announcement%' THEN 'announcement'
        WHEN source LIKE '%milestone%' THEN 'milestone'
        WHEN source LIKE '%navbar%' THEN 'navbar'
        WHEN source LIKE '%share%' THEN 'share'
        WHEN source LIKE '%link%' THEN 'link'
        WHEN source LIKE '%overlay%' THEN 'overlay'
        WHEN source LIKE '%my%%account%' THEN 'my_account'
        WHEN source LIKE '%survey%' THEN 'survey'
        WHEN source LIKE '%share%' THEN 'share'
        WHEN source LIKE '%offer%%tab%' THEN 'offer_tab'
        WHEN source LIKE '%bar%' THEN 'bar'
        WHEN source LIKE '%welcome%' THEN 'welcome'
        WHEN source LIKE '%social%' THEN 'social'
        WHEN source LIKE '%tv%' THEN 'tv'
        WHEN source LIKE '%home%%page%' THEN 'home_page'
        WHEN source LIKE '%main%%site%' THEN 'home_page'
        WHEN source LIKE '%sms%' THEN 'sms'
        WHEN source LIKE '%direct%' THEN 'direct'
        ELSE source
    END;

DELETE FROM records
WHERE
    source GLOB '[0-9]*';
