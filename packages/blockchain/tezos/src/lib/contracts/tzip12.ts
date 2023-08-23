export const Tezos_TZIP_12 = {
  michelson: `{ parameter
    (or (or (or %admin (unit %confirm_admin) (address %set_admin))
            (or %minter
               (or (list %burn (pair (address %owner) (list %tokens nat)))
                   (list %mint
                      (pair (address %owner)
                            (list %tokens (pair (nat %token_id) (map %token_info string bytes))))))
               (never %never)))
        (or (never %minter_admin)
            (or %tokens
               (or (pair %balance_of
                      (list %requests (pair (address %owner) (nat %token_id)))
                      (contract %callback
                         (list (pair (pair %request (address %owner) (nat %token_id)) (nat %balance)))))
                   (list %transfer
                      (pair (address %from_) (list %txs (pair (address %to_) (nat %token_id) (nat %amount))))))
               (list %update_operators
                  (or (pair %add_operator (address %owner) (address %operator) (nat %token_id))
                      (pair %remove_operator (address %owner) (address %operator) (nat %token_id))))))) ;
  storage
    (pair (pair (pair (pair %admin (address %admin) (option %pending_admin address))
                      (big_map %metadata string bytes))
                (unit %minter)
                (unit %minter_admin))
          (pair %tokens
             (pair (big_map %ledger nat address)
                   (big_map %operators (pair address address nat) unit))
             (big_map %token_metadata nat (pair (nat %token_id) (map %token_info string bytes))))) ;
  code { LAMBDA
           (pair address (option address))
           unit
           { CAR ;
             SENDER ;
             COMPARE ;
             NEQ ;
             IF { PUSH string "NOT_AN_ADMIN" ; FAILWITH } { UNIT } } ;
         PUSH string "FA2_TOKEN_UNDEFINED" ;
         PUSH string "FA2_INSUFFICIENT_BALANCE" ;
         PUSH string "FA2_NOT_OWNER" ;
         DIG 4 ;
         UNPAIR ;
         IF_LEFT
           { DIG 3 ;
             DROP ;
             IF_LEFT
               { DIG 2 ;
                 DIG 3 ;
                 DROP 2 ;
                 DUP 2 ;
                 CAR ;
                 CAR ;
                 CAR ;
                 SWAP ;
                 IF_LEFT
                   { DIG 3 ;
                     DROP 2 ;
                     DUP ;
                     CDR ;
                     IF_NONE
                       { DROP ; PUSH string "NO_PENDING_ADMIN" ; FAILWITH }
                       { SENDER ;
                         COMPARE ;
                         EQ ;
                         IF { NONE address ; UPDATE 2 ; SENDER ; UPDATE 1 }
                            { DROP ; PUSH string "NOT_A_PENDING_ADMIN" ; FAILWITH } } }
                   { DUP 2 ; DIG 4 ; SWAP ; EXEC ; DROP ; SOME ; UPDATE 2 } ;
                 NIL operation ;
                 DUP 3 ;
                 DIG 3 ;
                 CAR ;
                 DUP ;
                 CAR ;
                 DIG 4 ;
                 UPDATE 1 ;
                 UPDATE 1 ;
                 UPDATE 1 ;
                 SWAP }
               { DUP 2 ;
                 CAR ;
                 CAR ;
                 CAR ;
                 DIG 5 ;
                 SWAP ;
                 EXEC ;
                 DROP ;
                 DUP 2 ;
                 CAR ;
                 CDR ;
                 CAR ;
                 DUP 3 ;
                 CDR ;
                 DIG 2 ;
                 IF_LEFT
                   { IF_LEFT
                       { DUP 2 ;
                         CAR ;
                         CAR ;
                         SWAP ;
                         ITER { SWAP ;
                                DUP 2 ;
                                CDR ;
                                ITER { SWAP ;
                                       DUP ;
                                       DUP 3 ;
                                       GET ;
                                       IF_NONE
                                         { DROP 2 ; DUP 6 ; FAILWITH }
                                         { DUP 4 ;
                                           CAR ;
                                           SWAP ;
                                           COMPARE ;
                                           NEQ ;
                                           IF { DROP 2 ; DUP 5 ; FAILWITH } { SWAP ; NONE address ; SWAP ; UPDATE } } } ;
                                SWAP ;
                                DROP } ;
                         DIG 4 ;
                         DIG 5 ;
                         DROP 2 ;
                         DIG 2 ;
                         DUP 3 ;
                         DIG 3 ;
                         CAR ;
                         DIG 3 ;
                         UPDATE 1 ;
                         UPDATE 1 }
                       { DIG 4 ;
                         DIG 5 ;
                         DROP 2 ;
                         DUP 2 ;
                         CDR ;
                         DUP 3 ;
                         CAR ;
                         CAR ;
                         PAIR ;
                         SWAP ;
                         ITER { SWAP ;
                                DUP 2 ;
                                CDR ;
                                ITER { SWAP ;
                                       DUP ;
                                       CDR ;
                                       DUP 3 ;
                                       CAR ;
                                       MEM ;
                                       IF { DROP 2 ; PUSH string "USED_TOKEN_ID" ; FAILWITH }
                                          { DUP ;
                                            CDR ;
                                            DUP 3 ;
                                            DUP 4 ;
                                            CAR ;
                                            SWAP ;
                                            SOME ;
                                            SWAP ;
                                            UPDATE ;
                                            SWAP ;
                                            CAR ;
                                            DUP 4 ;
                                            CAR ;
                                            DIG 3 ;
                                            CAR ;
                                            SWAP ;
                                            SOME ;
                                            SWAP ;
                                            UPDATE ;
                                            PAIR } } ;
                                SWAP ;
                                DROP } ;
                         DIG 2 ;
                         DUP 3 ;
                         DIG 3 ;
                         CAR ;
                         DUP 4 ;
                         CAR ;
                         UPDATE 1 ;
                         UPDATE 1 ;
                         DIG 2 ;
                         CDR ;
                         UPDATE 2 } ;
                     PAIR }
                   { SWAP ;
                     DIG 2 ;
                     DIG 4 ;
                     DIG 5 ;
                     DROP 5 ;
                     PUSH string "INVALID_INVOCATION" ;
                     FAILWITH } ;
                 UNPAIR ;
                 DIG 2 ;
                 SWAP ;
                 UPDATE 2 ;
                 DUP ;
                 CAR ;
                 DUP ;
                 CDR ;
                 DIG 3 ;
                 UPDATE 1 ;
                 UPDATE 2 ;
                 UPDATE 1 ;
                 NIL operation } }
           { IF_LEFT
               { DIG 2 ;
                 DIG 3 ;
                 DIG 4 ;
                 DROP 4 ;
                 DUP ;
                 CAR ;
                 CAR ;
                 CAR ;
                 DIG 2 ;
                 SWAP ;
                 EXEC ;
                 DROP ;
                 DUP ;
                 DUP 2 ;
                 CAR ;
                 DUP ;
                 CDR ;
                 DIG 3 ;
                 CAR ;
                 CDR ;
                 CDR ;
                 UPDATE 2 ;
                 UPDATE 2 ;
                 UPDATE 1 ;
                 NIL operation }
               { DIG 5 ;
                 DROP ;
                 DUP 2 ;
                 CDR ;
                 SWAP ;
                 IF_LEFT
                   { DIG 3 ;
                     DROP ;
                     IF_LEFT
                       { DIG 3 ;
                         DROP ;
                         DUP ;
                         CAR ;
                         MAP { DUP 3 ;
                               CAR ;
                               CAR ;
                               DUP 2 ;
                               CDR ;
                               GET ;
                               IF_NONE
                                 { DROP ; DUP 4 ; FAILWITH }
                                 { DUP 2 ;
                                   CAR ;
                                   SWAP ;
                                   COMPARE ;
                                   EQ ;
                                   IF { PUSH nat 1 } { PUSH nat 0 } ;
                                   SWAP ;
                                   PAIR } } ;
                         DIG 4 ;
                         DROP ;
                         SWAP ;
                         CDR ;
                         PUSH mutez 0 ;
                         DIG 2 ;
                         TRANSFER_TOKENS ;
                         SWAP ;
                         NIL operation ;
                         DIG 2 ;
                         CONS }
                       { DUP 2 ;
                         CAR ;
                         CAR ;
                         SWAP ;
                         ITER { SWAP ;
                                DUP 2 ;
                                CDR ;
                                ITER { SWAP ;
                                       PUSH nat 0 ;
                                       DUP 3 ;
                                       GET 4 ;
                                       COMPARE ;
                                       EQ ;
                                       IF { SWAP ; DROP }
                                          { PUSH nat 1 ;
                                            DUP 3 ;
                                            GET 4 ;
                                            COMPARE ;
                                            NEQ ;
                                            IF { DROP 2 ; DUP 4 ; FAILWITH }
                                               { DUP ;
                                                 DUP 3 ;
                                                 GET 3 ;
                                                 GET ;
                                                 IF_NONE
                                                   { DROP 2 ; DUP 5 ; FAILWITH }
                                                   { DUP 4 ;
                                                     CAR ;
                                                     DUP 2 ;
                                                     COMPARE ;
                                                     NEQ ;
                                                     IF { DROP 3 ; DUP 4 ; FAILWITH }
                                                        { DUP 5 ;
                                                          CAR ;
                                                          CDR ;
                                                          DUP 4 ;
                                                          GET 3 ;
                                                          PAIR ;
                                                          SENDER ;
                                                          DUG 2 ;
                                                          UNPAIR ;
                                                          DUP 4 ;
                                                          DUP 4 ;
                                                          COMPARE ;
                                                          EQ ;
                                                          IF { DROP 4 }
                                                             { DIG 3 ;
                                                               PAIR ;
                                                               DIG 2 ;
                                                               PAIR ;
                                                               MEM ;
                                                               IF {} { PUSH string "FA2_NOT_OPERATOR" ; FAILWITH } } ;
                                                          DUP 2 ;
                                                          CAR ;
                                                          SOME ;
                                                          DIG 2 ;
                                                          GET 3 ;
                                                          UPDATE } } } } } ;
                                SWAP ;
                                DROP } ;
                         DIG 3 ;
                         DIG 4 ;
                         DROP 2 ;
                         DUP 2 ;
                         DIG 2 ;
                         CAR ;
                         DIG 2 ;
                         UPDATE 1 ;
                         UPDATE 1 ;
                         NIL operation } }
                   { DIG 4 ;
                     DIG 5 ;
                     DROP 2 ;
                     SENDER ;
                     DUP 3 ;
                     CAR ;
                     CDR ;
                     DIG 2 ;
                     ITER { SWAP ;
                            DUP 3 ;
                            DUP 3 ;
                            IF_LEFT {} {} ;
                            CAR ;
                            COMPARE ;
                            EQ ;
                            IF {} { DUP 6 ; FAILWITH } ;
                            SWAP ;
                            IF_LEFT
                              { SWAP ;
                                UNIT ;
                                SOME ;
                                DUP 3 ;
                                GET 4 ;
                                DUP 4 ;
                                GET 3 ;
                                PAIR ;
                                DIG 3 ;
                                CAR ;
                                PAIR ;
                                UPDATE }
                              { SWAP ;
                                DUP 2 ;
                                GET 4 ;
                                DUP 3 ;
                                GET 3 ;
                                PAIR ;
                                DIG 2 ;
                                CAR ;
                                PAIR ;
                                NONE unit ;
                                SWAP ;
                                UPDATE } } ;
                     SWAP ;
                     DIG 4 ;
                     DROP 2 ;
                     DUP 2 ;
                     DIG 2 ;
                     CAR ;
                     DIG 2 ;
                     UPDATE 2 ;
                     UPDATE 1 ;
                     NIL operation } ;
                 DUG 2 ;
                 UPDATE 2 ;
                 SWAP } } ;
         PAIR } }`,
}
